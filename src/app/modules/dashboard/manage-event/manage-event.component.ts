import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CustomSweetalertService } from 'src/app/core/shared/services/sweetalert/custom-sweetalert.service';
import { ConstantClass } from 'src/app/shared/constants/constants';
import { SVGs } from 'src/app/shared/constants/svgs';
import minMaxTimePlugin from 'flatpickr/dist/plugins/minMaxTimePlugin';

@Component({
  selector: 'app-manage-event',
  templateUrl: './manage-event.component.html',
  styleUrls: ['./manage-event.component.scss'],
})
export class ManageEventComponent implements OnInit {
  //Constants
  public svgs;
  public constant;
  //To validate on click on submit
  isFormSubmitted = false;
  isSpin = false;
  dropdownPopoverShow = false;
  // selectedStartDate: any;
  // selectedEndDate: any;
  defaultEndDate!: Date;
  nowDate = new Date();
  dadda: string = '';
  pluginsArr = {
    '2022-10-10': {
      minTime: '16:00',
      maxTime: '22:00',
    },
    '2022-11-11': {
      minTime: '16:00',
      maxTime: '22:00',
    },
  };

  plugins = [
    minMaxTimePlugin({
      table: {
        '2022-10-10': {
          minTime: '16:00',
          maxTime: '22:00',
        },
      },
    }),
  ];

  colors = [
    {
      name: 'red',
      backgroundColor: '#fee2e2',
      borderColor: '#fee2e2',
      textColor: '#000',
      classNames: ['event-color-red'],
    },
    {
      name: 'green',
      backgroundColor: '#dcfce7',
      borderColor: '#dcfce7',
      textColor: '#000',
      classNames: ['event-color-green'],
    },
    {
      name: 'blue',
      backgroundColor: '#e0f2fe',
      borderColor: '#e0f2fe',
      textColor: '#000',
      classNames: ['event-color-blue'],
    },
  ];

  timeSlote = 60;
  officeStartTime = '10:30';
  officeEndTime = '19:30';
  startTime: any[] = [];
  private tempStartTime: any[] = [];
  endTime: any[] = [];

  @Output() closeEvent = new EventEmitter();
  @Output() addEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();
  @Input() currentDate: any;
  @Input() isEditEvent: any;

  //Array of object for showing validation message in loop
  validationMessages = {
    title: [{ type: ConstantClass.required, message: 'MESSAGE.REQUIRED' }],
    start: [{ type: ConstantClass.required, message: 'MESSAGE.REQUIRED' }],
    end: [],
    color: [{ type: ConstantClass.required, message: 'MESSAGE.REQUIRED' }],
  };

  constructor(
    private formBuilder: FormBuilder,
    // public departmentService: DepartmentService,
    private _eref: ElementRef,
    private customSweetalertService: CustomSweetalertService
  ) {
    //Initialize signin form
    this.initialization();
    //constants
    this.constant = ConstantClass;
    this.svgs = SVGs;
  }

  ngDoCheck(): void {
    this.plugins = [
      minMaxTimePlugin({
        table: {
          '2022-10-10': {
            minTime: '16:00',
            maxTime: '22:00',
          },
          '2022-11-11': {
            minTime: '16:00',
            maxTime: '22:00',
          },
        },
      }),
    ];
  }

  ngOnInit(): void {
    // If edit form then patch value and setTimeout bcz data got on little bit of delay
    if (this.isEditEvent) {
      this._addEventForm['allDay'].setValue(this.isEditEvent?.allDay);
      let color = this.colors.filter(
        (data: any) => data.backgroundColor === this.isEditEvent?.color
      );
      this.isEditEvent.color = color[0]?.name;

      setTimeout(() => {
        ConstantClass.addEventForm.patchValue(this.isEditEvent);
      }, 1000);
    }

    //Add noScroll class on open sidebar
    document.body.classList.add(ConstantClass.bodyNoScrollClass);

    //If isEditEvent NOT
    if (!this.isEditEvent) {
      //Set allDay value for check current calendar view is month or week/day
      this._addEventForm['allDay'].setValue(this.currentDate.allDay);
      setTimeout(() => {
        //Set start value - current click value in calendar
        this._addEventForm['start'].setValue(this.currentDate.date);

        let nowDate = new Date();
        let time = this.officeStartTime;

        //whilw condition for array of startTime value
        while (
          this.startTime[this.startTime?.length - 1]?.name != this.officeEndTime
        ) {
          //If condition for nowDate and clicked currentDate
          if (
            `${nowDate.getDate()}/${
              nowDate.getMonth() + 1
            }/${nowDate.getFullYear()}` ===
            `${this.currentDate.date.getDate()}/${
              this.currentDate.date.getMonth() + 1
            }/${this.currentDate.date.getFullYear()}`
          ) {
            //If true then second condition for get time is grater then now time
            if (
              time >
              `${
                String(nowDate.getHours()).length > 1
                  ? nowDate.getHours()
                  : '0' + nowDate.getHours()
              }:${
                String(nowDate.getMinutes()).length > 1
                  ? nowDate.getMinutes()
                  : '0' + nowDate.getMinutes()
              }`
            ) {
              //Push time to startTime array
              this.startTime.push({ name: time });
            }
          } 
          //If false push time to startTime array
          else {
            this.startTime.push({ name: time });
          }
          //store time and add timeSlote 
          time = this.addTime(time);
        }

        //store startTime array in tempStartTime
        this.tempStartTime = [...this.startTime];
        //Delete offive endTime or last time in start time dropdown
        this.startTime.pop();

        //condition for if clicked current time is less then officeStartTime then set thet on startTime field
        if (
          `${
            String(this.currentDate.date.getHours()).length > 1
              ? this.currentDate.date.getHours()
              : '0' + this.currentDate.date.getHours()
          }:${
            String(this.currentDate.date.getMinutes()).length > 1
              ? this.currentDate.date.getHours()
              : '0' + this.currentDate.date.getHours()
          }` < this.officeStartTime
        ) {
          this._addEventForm['startTime'].setValue(this.officeStartTime);
          this._addEventForm['startTime'].updateValueAndValidity();
        } 
        //condition for if clicked current time is grater then officeEndTime then set endTime-1 on field
        else if (
          `${
            String(this.currentDate.date.getHours()).length > 1
              ? this.currentDate.date.getHours()
              : '0' + this.currentDate.date.getHours()
          }:${
            String(this.currentDate.date.getMinutes()).length > 1
              ? this.currentDate.date.getHours()
              : '0' + this.currentDate.date.getHours()
          }` >= this.officeEndTime
        ) {
          this._addEventForm['startTime'].setValue(
            this.startTime[this.startTime.length - 1]?.name
          );
          this._addEventForm['startTime'].updateValueAndValidity();
        } else {
          //set currentDate time to startTime
          this._addEventForm['startTime'].setValue(
            `${
              String(this.currentDate.date.getHours()).length > 1
                ? this.currentDate.date.getHours()
                : '0' + this.currentDate.date.getHours()
            }:${
              String(this.currentDate.date.getMinutes()).length > 1
                ? this.currentDate.date.getMinutes()
                : '0' + this.currentDate.date.getMinutes()
            }`
          );
          if (this._addEventForm['startTime'].value == this.officeEndTime) {
            this._addEventForm['startTime'].setValue(
              this.startTime[this.startTime.length - 1]?.name
            );
          }
          this._addEventForm['startTime'].updateValueAndValidity();
        }

        //Array update of endTime
        this.endTime = this.tempStartTime.filter(
          (data) => data.name > this._addEventForm['startTime'].value
        );
        //set value in endTime
        this._addEventForm['endTime'].setValue(this.endTime[0]?.name);
        this._addEventForm['endTime'].updateValueAndValidity();

        //setValue in end
        this._addEventForm['end'].setValue(
          this.addOneHour(
            this.currentDate.date,
            this.currentDate.date.getHours()
          )
        );
      }, 100);
    }
  }

  //Add 1 timeslote in previous time
  addTime(startTime: String) {
    let timeArray = startTime.split(':');
    timeArray[1] = String(Number(timeArray[1]) + this.timeSlote);
    if (timeArray[1] >= '60') {
      if (timeArray[0] === '24') {
        timeArray[0] = '00';
      }
      timeArray[0] =
        String(Number(timeArray[0]) + 1).length > 1
          ? String(Number(timeArray[0]) + 1)
          : '0' + String(Number(timeArray[0]) + 1);
      timeArray[1] =
        String(Number(timeArray[1]) - 60).length > 1
          ? String(Number(timeArray[1]) - 60)
          : '0' + String(Number(timeArray[1]) - 60);
    }
    return timeArray.join(':');
  }

  //Initialize addEventForm
  initialization() {
    ConstantClass.addEventForm = this.formBuilder.group({
      title: ['', [ConstantClass.validators.required]],
      allDay: [false, [ConstantClass.validators.required]],
      start: ['', [ConstantClass.validators.required]],
      startTime: [''],
      end: [''],
      endTime: [''],
      color: ['', [ConstantClass.validators.required]],
    });
  }

  //To close sidebar on click on backdrop
  @HostListener(ConstantClass.document.click, ['$event'])
  public closeSideBar(event: any) {
    if (
      !this._eref.nativeElement.contains(event.target) &&
      !event.target.innerText &&
      event.target.nodeName != 'svg' &&
      event.target.nodeName != 'path' &&
      event.target.nodeName != 'SPAN' &&
      event.target.nodeName != 'INPUT'
    ) {
      this.onClose();
    }
  }

  //On scroll addEventForm
  @HostListener(ConstantClass.document.scroll, ['$event'])
  scrollHandler(event: any) {
    //Store numbers for show shadow in top (In footer) and botton (In header)
    ConstantClass.sideBar.scrollTop = event.target.scrollTop;
    ConstantClass.sideBar.scrollHeight = event.target.scrollHeight;
    ConstantClass.sideBar.offsetHeight = event.target.offsetHeight;
  }

  //Get all controls
  get _addEventForm() {
    return ConstantClass.addEventForm.controls;
  }

  //On click on any DropDown item
  onClick(item: any, label: string, index?: number) {
    this.dropdownPopoverShow = false;

    this._addEventForm[label].setValue(item);
    this._addEventForm[label].updateValueAndValidity();

    if (label === 'startTime') {
      this.endTime = this.tempStartTime.filter((data) => data.name > item);
      this._addEventForm['endTime'].setValue(this.endTime[0].name);
      this._addEventForm['endTime'].updateValueAndValidity();
    }
  }

  onCloseSelected(label: string) {
    this._addEventForm[label].reset();
    this._addEventForm[label].updateValueAndValidity();
  }

  onChangeStartDate(event: any) {
    //   const startDate = event?.selectedDates[0];
    //   console.log(
    //     startDate.getFullYear(),
    //     startDate.getMonth() + 1,
    //     startDate.getDate()
    //   );
    //   console.log(event);
    //   this.pluginsArr = {
    //     ...this.pluginsArr,
    //     [startDate]: {
    //       minTime: '16:00',
    //       maxTime: '22:00',
    //     },
    //   };
    //   console.log((this.pluginsArr), this.plugins);

    // this.plugins.push(
    //   minMaxTimePlugin({
    //     table: {
    //       '2022-11-11': {
    //         minTime: '16:00',
    //         maxTime: '22:00',
    //       },
    //     },
    //   })
    // );

    // this.defaultEndDate = event?.selectedDates[0];
    // this.defaultEndDate?.setHours(
    //   event?.instance?.latestSelectedDateObj?.getHours() + 1
    // );
    this.defaultEndDate = this.addOneHour(
      event?.selectedDates[0],
      event?.instance?.latestSelectedDateObj?.getHours()
    );

    setTimeout(() => {
      this._addEventForm['end'].setValue(this.defaultEndDate);
    }, 1000);
  }

  addOneHour(date: Readonly<Date>, hours: number) {
    let newDate = date;
    newDate.setHours(hours + 1);
    return newDate;
  }

  //On submit addEventForm form
  onSubmit(val: any) {
    //If invalid
    if (ConstantClass.addEventForm.invalid) {
      //To show error msg
      this.isFormSubmitted = true;
      return;
    }

    let colorIndex = this.colors.findIndex(
      (data) => data.name === this._addEventForm['color']?.value
    );

    // var allDayStartDate =
    //   typeof this.selectedStartDate !== 'string'
    //     ? `${this.selectedStartDate?.getFullYear()}-${
    //         (this.selectedStartDate?.getMonth() + 1).toString().length > 1
    //           ? this.selectedStartDate?.getMonth() + 1
    //           : '0' + (this.selectedStartDate?.getMonth() + 1)
    //       }-${
    //         this.selectedStartDate?.getDate().toString().length > 1
    //           ? this.selectedStartDate?.getDate()
    //           : '0' + this.selectedStartDate?.getDate()
    //       }`
    //     : this.selectedStartDate;

    // To store data in object
    let event = {
      title: this._addEventForm['title']?.value,
      start:
        typeof this._addEventForm['start'].value !== 'string'
          ? this._addEventForm['allDay'].value
            ? `${this._addEventForm['start'].value.getFullYear()}-${
                this._addEventForm['start'].value.getMonth() + 1
              }-${this._addEventForm['start'].value.getDate()}`
            : this._addEventForm['start'].value
          : this._addEventForm['start'].value,
      end:
        typeof this._addEventForm['end'].value !== 'string'
          ? this._addEventForm['allDay'].value
            ? `${this._addEventForm['end'].value.getFullYear()}-${
                this._addEventForm['end'].value.getMonth() + 1
              }-${this._addEventForm['end'].value.getDate()}`
            : this._addEventForm['end'].value
          : this._addEventForm['end'].value,
      backgroundColor: this.colors[colorIndex].backgroundColor,
      borderColor: this.colors[colorIndex].borderColor,
      textColor: this.colors[colorIndex].textColor,
      classNames: this.colors[colorIndex].classNames,
    };
    console.log(event);
    this.addEvent.emit(event);
    // setTimeout(() => {
    //   //Condition for edit or add
    //   if (ConstantClass.editDepartmentIndex) {
    //     //To update department
    //     this.departmentService.updateDepartment('', department);
    //     //To clear edit id
    //     ConstantClass.editDepartmentIndex = null;
    //   }
    //   //To add department
    //   else this.departmentService.createDepartment('', department);

    //   //To navigate to back
    //   this.router.navigate([`../`], {
    //     relativeTo: this.activatedRoute,
    //   });
    // }, 400);

    //To clear data on form
    ConstantClass.addEventForm.reset();
    this.isFormSubmitted = false;
  }

  // To delete record
  onDelete() {
    //To take confirmation on delete
    this.customSweetalertService.sweetAlertMethod(
      'MESSAGE.ON_DELETE_RECORD',
      () => {
        //If yes
        this.deleteEvent.emit(this.isEditEvent);
        this.onClose();
      }
    );
  }

  onClose() {
    this.closeEvent.emit();
  }

  ngOnDestroy(): void {
    //Remove noScroll class on close sidebar
    document.body.classList.remove(ConstantClass.bodyNoScrollClass);
  }
}
