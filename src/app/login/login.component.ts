import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Http } from '@angular/http';

declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  netImage:any = "../assets/images/linovhr.png";
  loginForm: FormGroup;
  constructor(private formBuilder:FormBuilder, private http:Http) {

  }

  // createLoginForm(){
  //   this.loginForm = this.formBuilder.group({
  //     email
  //   })
  // }

  ngOnInit() {
    $(function() {
			$("input[type='password'][data-eye]").each(function(i) {
				let $this = $(this);
		
				$this.wrap($("<div/>", {
					style: 'position:relative'
				}));
				$this.css({
					paddingRight: 60
				});
				$this.after($("<div/>", {
					html: 'Show',
					class: 'btn btn-primary btn-sm',
					id: 'passeye-toggle-'+i,
					style: 'position:absolute;right:10px;top:50%;transform:translate(0,-50%);padding: 2px 7px;font-size:12px;cursor:pointer;'
				}));
				$this.after($("<input/>", {
					type: 'hidden',
					id: 'passeye-' + i
				}));
				$this.on("keyup paste", function() {
					$("#passeye-"+i).val($(this).val());
				});
				$("#passeye-toggle-"+i).on("click", function() {
					if($this.hasClass("show")) {
						$this.attr('type', 'password');
						$this.removeClass("show");
						$(this).removeClass("btn-outline-primary");
					}else{
						$this.attr('type', 'text');
						$this.val($("#passeye-"+i).val());				
						$this.addClass("show");
						$(this).addClass("btn-outline-primary");
					}
				});
			});
		});
  }

}
