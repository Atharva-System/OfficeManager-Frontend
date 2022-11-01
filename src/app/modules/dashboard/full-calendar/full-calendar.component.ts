import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  CalendarApi,
  CalendarOptions,
  FullCalendarComponent,
} from '@fullcalendar/angular';
import { Draggable } from '@fullcalendar/interaction';
import { FlatpickrDirective } from 'angularx-flatpickr';
import flatpickr from 'flatpickr';
import * as moment from 'moment';
import { ConstantClass } from 'src/app/shared/constants/constants';
import { SVGs } from 'src/app/shared/constants/svgs';
import { slideInAnimation } from '../employee-list/app.animation';

@Component({
  selector: 'app-full-calendar',
  templateUrl: './full-calendar.component.html',
  styleUrls: ['./full-calendar.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideInAnimation],
})
export class FullCalendarComponent1 implements OnInit {
  dropdownButtonElement!: HTMLElement;
  public svgs = SVGs;
  isAdd = false;
  currentDate: any;
  isEditIndex: any = '';
  isEditEvent: any = '';

  // references the #calendar in the template
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  external = document.getElementById('external');
  calendarOptions!: CalendarOptions;

  events = [
    {
      title: 'event1',
      start: '2022-10-10',
      backgroundColor: '#fee2e2',
      borderColor: '#fee2e2',
      textColor: '#000',
      classNames: ['event-color-red'],
      icon: [this.svgs.home],
    },
    {
      title: 'event2',
      start: '2022-10-10',
      backgroundColor: '#dcfce7',
      borderColor: '#dcfce7',
      textColor: '#000',
      classNames: ['event-color-green'],
      icon: [this.svgs.happySmile],
    },
    {
      title: 'event3',
      start: '2022-10-10',
      backgroundColor: '#e0f2fe',
      borderColor: '#e0f2fe',
      textColor: '#000',
      classNames: ['event-color-blue'],
    },
    {
      title: 'event4',
      start: '2022-10-07T02:00:00',
      end: '2022-10-07T02:45:00',
      backgroundColor: '#e0f2fe',
      borderColor: '#e0f2fe',
      textColor: '#000',
      classNames: ['event-color-blue'],
    },
    {
      title: 'event5',
      start: '2022-10-07T01:30:00',
      end: '2022-10-07T03:00:00',
      backgroundColor: '#fee2e2',
      borderColor: '#fee2e2',
      textColor: '#000',
      classNames: ['event-color-red'],
    },
    {
      title: 'event6',
      start: '2022-10-07T01:30:00',
      end: '2022-10-07T03:00:00',
      backgroundColor: '#dcfce7',
      borderColor: '#dcfce7',
      textColor: '#000',
      classNames: ['event-color-green'],
    },
    {
      title: 'event7',
      start: '2010-01-09T12:30:00',
    },
    {
      title: 'Every Day',
      daysOfWeek: [1, 2, 3, 4, 5], //Sundays and saturdays
      overLap: false,
      allDay: false,
      startTime: '10:00',
      endTime: '11:30',
      backgroundColor: '#dcfce7',
      borderColor: '#dcfce7',
      textColor: '#000',
      classNames: ['event-color-green'],
      editable: false,
    },
    {
      title: 'Business Lunch',
      start: '2022-09-03T13:00:00',
      constraint: 'businessHours',
    },
    {
      title: 'Meeting',
      start: '2022-09-13T11:00:00',
      constraint: 'availableForMeeting', // defined below
      color: '#dcfce7',
    },
    {
      title: 'Conference',
      start: '2022-09-18T00:00:00+05:30',
      end: '2022-09-20',
    },
    {
      title: 'Party',
      start: '2022-09-29T20:00:00',
    },

    // areas where "Meeting" must be dropped
    {
      groupId: 'availableForMeeting',
      start: '2022-09-11',
      end: '2022-09-11',
      display: 'background',
    },
    {
      groupId: 'availableForMeeting',
      start: '2022-09-13',
      end: '2022-09-13',
      display: 'background',
    },

    // red areas where no events can be dropped
    {
      start: '2022-09-24',
      end: '2022-09-28',
      overlap: false,
      display: 'background',
      color: '#fecaca',
    },
    {
      start: '2022-09-06',
      end: '2022-09-08',
      overlap: false,
      display: 'background',
      color: '#fecaca',
    },
  ];

  constructor(
    private elementRef: ElementRef,
    protected sanitizer: DomSanitizer
  ) {}

  //To hide DropDown on click on outside
  @HostListener(ConstantClass.document.click, ['$event'])
  public hideDropdown(event: Event) {
    if (
      this.dropdownButtonElement?.nextElementSibling &&
      event.target != this.dropdownButtonElement
    ) {
      this.dropdownButtonElement?.nextElementSibling.remove();
    }
  }

  //To hide DropDown on press on Esc
  @HostListener(ConstantClass.document.keydown, ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ) {
    if (event.key.toLowerCase() === ConstantClass.escapeKey) {
      this.dropdownButtonElement?.nextElementSibling?.remove();
    }
  }

  //method on dateClick in calendar
  onDateClick(res: { dateStr: string }) {
    this.currentDate = res;

    if (this.currentDate.date >= new Date()) {
      this.isAdd = true;
    }
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.calendarOptions = {
        timeZone: 'local',
        editable: true,
        initialView: 'dayGridMonth',
        headerToolbar: {
          left: 'today prev,next title',
          // left: 'today prev,next datePickerButton title',
          right: 'customButtons',
        },
        nowIndicator: true,
        nowIndicatorClassNames: 'now-indicator',
        customButtons: {
          ['customButtons']: {
            text: 'Month',
            click: this.onDropdownClick.bind(this),
          },
          // ['datePickerButton']: {
          //   text: 'title',
          //   click: this.onDatePickerClick.bind(this),
          // },
        },
        dateClick: this.onDateClick.bind(this),
        dayMaxEvents: 2,
        eventSources: [
          {
            events: this.events,
          },
        ],
        businessHours: {
          startTime: '10:30', // a start time (10am in this example)
          endTime: '19:30',
        }, // display business hours
        //add class in every event
        eventClassNames: (event: any) => {
          var className = `event-custom-class-${event.event._def.defId}`;
          return [className];
        },
        // eventContent: this.onEventContent.bind(this),
        //call  before render event
        eventDidMount: (event: any) => {
          //used this for add icon or emoji
          let arr: Array<string> = event.el.classList.value.split(' ');

          arr.some((element: any, index: number) => {
            if (element.includes('custom-class')) {
              let titleElement = document.querySelector(
                `.${element} .fc-event-title`
              );

              let titleElementModel = document.querySelector(
                `.fc-popover .${element} .fc-event-title`
              );

              titleElement?.classList.add('main-event-div');
              titleElementModel?.classList.add('main-event-div');

              const node = document.createElement('img');
              if (
                event.event.extendedProps?.icon &&
                (titleElement?.childNodes?.length || 1) < 2
              ) {
                let icons: Array<string> = event.event.extendedProps?.icon;
                [icons].forEach((data: any) => {
                  node.src = data;
                  node.className =
                    'mx-1 w-4 h-4 fill-neutral-900 stroke-neutral-900';
                  if (titleElement) {
                    titleElement.prepend(node);
                  }
                });
              }
              if (
                event.event.extendedProps?.icon &&
                (titleElementModel?.childNodes?.length || 1) < 2
              ) {
                let icons: Array<string> = event.event.extendedProps?.icon;
                [icons].forEach((data: any) => {
                  node.src = data;
                  node.className =
                    'mx-1 w-4 h-4 fill-neutral-900 stroke-neutral-900';
                  if (titleElementModel) {
                    titleElementModel.prepend(node);
                  }
                });
              }
            }
          });
        },
        eventClick: this.onEventClick.bind(this),
      };

      //for drag and drop event
      if (this.external) {
        new Draggable(this.external, {
          itemSelector: '.fc-event',
          eventData: function (eventEl: any) {
            return {
              title: eventEl.innerText,
            };
          },
        });
      }
    }, 500);
  }

  //on add event
  onAddEvent(event: any) {
    //if isEditIndex not null
    if (this.isEditIndex !== '') {
      //condition for time is there or not
      if (
        this.events[this.isEditIndex].start ||
        this.events[this.isEditIndex].end
      ) {
        this.events[this.isEditIndex] = {
          ...this.events[this.isEditIndex],
          title: event.title,
          start: event.start,
          end: event.end,
          backgroundColor: event.backgroundColor,
          borderColor: event.borderColor,
          textColor: event.textColor,
          classNames: event.classNames,
        };
      }
      //condition to check time 
      else if (
        this.events[this.isEditIndex].startTime ||
        this.events[this.isEditIndex].endTime
      ) {
        //for formatting
        event.start = new Date(event.start);
        event.end = new Date(event.end);
        event.start =
          (event.start.getHours().toString().length < 2
            ? '0' + event.start.getHours()
            : event.start.getHours()) +
          ':' +
          (event.start.getMinutes().toString().length < 2
            ? '0' + event.start.getMinutes()
            : event.start.getMinutes());
        event.end =
          (event.end.getHours().toString().length < 2
            ? '0' + event.end.getHours()
            : event.end.getHours()) +
          ':' +
          (event.end.getMinutes().toString().length < 2
            ? '0' + event.end.getMinutes()
            : event.end.getMinutes());

            //update event
        this.events[this.isEditIndex] = {
          ...this.events[this.isEditIndex],
          title: event.title,
          startTime: event.start,
          endTime: event.end,
          backgroundColor: event.backgroundColor,
          borderColor: event.borderColor,
          textColor: event.textColor,
          classNames: event.classNames,
        };
      }

      this.isEditIndex = '';
      this.isEditEvent = '';
    } else {
      this.events.push(event);
    }
    this.calendarOptions.events = [...this.events];
    this.isAdd = false;
  }

  //on event click and edit
  onEventClick(event: any) {
    this.isEditIndex = this.events.findIndex(
      (data: any) => data.title === event.event.title
    );
    this.isAdd = true;
    this.isEditEvent = {
      title: event.event.title,
      start: event.event.startStr,
      end: event.event.endStr,
      allDay: event.event.allDay,
      color: event.event.backgroundColor,
    };
  }

  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends; // toggle the boolean!
  }

  onDatePickerClick(ev: MouseEvent, element: HTMLElement) {
    flatpickr(element).open();
    ev.preventDefault();

    // element.innerText = this.calendarComponent.getApi().currentData.viewTitle;
    // this.calendarComponent.getApi().gotoDate(moment('2022-02-16T00:00:00+05:30'));
    // console.log(moment((<HTMLInputElement>ev?.target)?.value).format() );

    // this.calendarComponent
    //   .getApi()
    //   .gotoDate((<HTMLInputElement>ev?.target)?.value);
  }

  onDropdownClick(ev: MouseEvent, element: HTMLElement) {
    //Store element to hide click on outside or press ESC
    this.dropdownButtonElement = element;

    //created new node for dropdown-content
    const node = document.createElement('div');
    node.classList.add('dropdown-content');
    //Added child div for dropdown-items
    node.innerHTML = `
      <div id="item-1" class="flex dropdown-item hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded-sm cursor-pointer items-center" onclick="onClickDropdownItem('month')"> <img src="${this.svgs.monthlyCalendar}" class="h-3 w-3 mx-2 fill-black stroke-black" /> Month </div>
      <div id="item-2" class="flex dropdown-item hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded-sm cursor-pointer items-center" (onClick)="this.onClickDropdownItem('week')"> <img src="${this.svgs.weeklyCalendar}" class="h-3 w-3 mx-2 fill-black stroke-black" /> Week </div>
      <div id="item-3" class="flex dropdown-item hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded-sm cursor-pointer items-center" (onClick)="onClickDropdownItem('day')"> <img src="${this.svgs.dailyCalendar}" class="h-3 w-3 mx-2 fill-black stroke-black" /> Day </div>
    `;

    //Condition for dropdwon or not
    if (element.nextElementSibling) {
      //If dropdown then remove
      element.nextElementSibling.remove();
    } else {
      //If not then add
      element.parentNode?.append(node);

      //On click on item of dropdown
      let itemOne: any = document.getElementById('item-1');
      itemOne.onclick = function (event: any) {
        //To change calendar view
        onClickDropdownItem('month');
      };
      let itemTwo: any = document.getElementById('item-2');
      itemTwo.onclick = function () {
        //To change calendar view
        onClickDropdownItem('week');
      };
      let itemThree: any = document.getElementById('item-3');
      itemThree.onclick = function () {
        //To change calendar view
        onClickDropdownItem('day');
      };
    }

    //On click dropdown item
    const onClickDropdownItem = (calendar?: string) => {
      switch (calendar) {
        case 'week':
          //To change calendar view
          this.calendarComponent.getApi().changeView('timeGridWeek');
          //To remove dropdown
          element?.nextElementSibling?.remove();
          //To change text of button
          this.calendarOptions.customButtons = {
            ['customButtons']: {
              text: 'Week',
              click: this.onDropdownClick.bind(this),
            },
          };
          break;
        case 'day':
          //To change calendar view
          this.calendarComponent.getApi().changeView('timeGridDay');
          //To remove dropdown
          element?.nextElementSibling?.remove();
          //To change text of button
          this.calendarOptions.customButtons = {
            ['customButtons']: {
              text: 'Day',
              click: this.onDropdownClick.bind(this),
            },
          };
          break;
        default:
          //To change calendar view
          this.calendarComponent.getApi().changeView('dayGridMonth');
          //To remove dropdown
          element?.nextElementSibling?.remove();
          //To change text of button
          this.calendarOptions.customButtons = {
            ['customButtons']: {
              text: 'Month',
              click: this.onDropdownClick.bind(this),
            },
          };
          break;
      }
    };
  }

  onDelete(event: any) {
    this.events.splice(this.isEditIndex, 1);
    this.calendarOptions.events = [...this.events];
  }

  onClose() {
    this.isAdd = false;
    this.isEditEvent = '';
    this.isEditIndex = '';
  }

  onEventContent(event: any) {
    // event.event.
    // event.event._context.options.eventSources[0].events.forEach(
    //   (data1: any, index:number) => {
    //     if (
    //       data1.title === event.event._def.title &&
    //       !data1.classNames?.includes(`event-${event.event._def.defId}`)
    //     ) {
    //       data1.classNames.push('event-po');
    //       // data1.title = 'kkkkkkk';
    //       // console.log(data1.classNames);
    //       // this.calendarOptions.eventSources = [
    //       //   ...event.event._context.options.eventSources,
    //       // ];
    //     }
    //     if(index === (event.event._context.options.eventSources[0].events.length -1 )){
    //       this.calendarComponent.getApi().render();
    //     }
    //   }
    // );
    //   // data.forEach((value: Element, key: number) => {
    //   //   value.classList.add('main-event-div');
    //   //   const node = document.createElement('img');
    //   //   // console.log(event.event._def.title, event.event._def.extendedProps.icon);
    //   //   if (event.event._def.extendedProps.icon) {
    //   //     node.src = event.event._def.extendedProps.icon;
    //   //     node.className = 'mx-1 w-4 h-4 fill-neutral-900 stroke-neutral-900';
    //   //   }
    //   //   console.log(value.childNodes);
    //   //   if (value.childNodes.length < 2) value.prepend(node);
    //   // });
    //   // const node = document.createElement('img');
    //   // if (event?.event?._def?.extendedProps?.icon) {
    //   //   node.src = event.event._def.extendedProps.icon;
    //   //   node.className = 'mx-1 w-4 h-4 fill-neutral-900 stroke-neutral-900';
    //   //   data[data?.length]?.prepend(node);
    //   // }
  }
}
