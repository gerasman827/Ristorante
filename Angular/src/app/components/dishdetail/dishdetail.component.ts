import { Component, Input, OnInit, Output, Inject } from '@angular/core';

import { Params, ActivatedRoute } from '@angular/router'; // para recibir por parámetros los valores desde url
import { Location } from '@angular/common';

import { switchMap } from 'rxjs/operators';
import { DishService } from '../../services/dish.service';
import { Dish } from '../../shared/dish';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback } from 'src/app/shared/feedback';
import { Comment } from 'src/app/shared/comment';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})


export class DishdetailComponent implements OnInit {

  feedbackForm: FormGroup;
  comment: Comment;

  // @Input() dish: Dish; //recibía el plato desde menú. Ahora lo hace por parámetros
  dish: Dish;

  dishIds: string[];
  prev: string;
  next: string;

  errMess: string;

  dishcopy: Dish;

  formErrors: any = {
    'author': '',
    'comment': ''
  };

  validationMessages: any = {
    'author': {
      'required': 'Author es required.',
      'minlength': 'Author mush be at last 2 characteres long.',
      'maxlength': 'Author cannot be more than 25 caracteres long.'
    },
    'comment': {
      'required': 'The comment is required',
      'minlength': 'The comment must be at last 2 characters long.'
    }
  }

  constructor(private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') public BaseURL: any) { }

  ngOnInit(): void {
    this.createForm();

    // let id = this.route.snapshot.params['id'];
    // this.dishService.getDish(id)
    // .subscribe(dish => this.dish = dish);

    // usando observables ... 
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);

    // this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
    // .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); },
    // errmess => this.errMess = <any>errmess);

    this.route.params
      .pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); },
        errmess => this.errMess = <any>errmess);

  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      comment: ['', [Validators.required, Validators.minLength(2)]],
      rating: ['']
    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const message = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += message[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.comment = this.feedbackForm.value;
    let fecha = new Date().toISOString();
    this.comment.date = String(fecha);

    this.dishcopy.comments.push(this.comment);
    this.dishService.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dish = dish; this.dishcopy = dish;
      },
        errmess => { this.errMess = <any>errmess; });
  }

}
