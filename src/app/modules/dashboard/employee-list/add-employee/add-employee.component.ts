import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
  // host: {
  //   class: 'add-employee-sidebar',
  // },
})
export class AddEmployeeComponent implements OnInit {
  constructor(private router: Router, public activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {}

  onClose() {
    this.router.navigate([`../`], {
      relativeTo: this.activatedRoute,
    });
  }
}
