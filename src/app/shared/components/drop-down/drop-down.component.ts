import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core'
import { ConstantClass } from '../../constants/constants'
import { SVGs } from '../../constants/svgs'

@Component({
	selector: 'app-drop-down',
	templateUrl: './drop-down.component.html',
	styleUrls: ['./drop-down.component.scss'],
})
export class DropDownComponent implements OnInit {
	public svgs

	dropdownPopoverShow = false
	searchAttribute!: string

	@Input() icon!: string
	@Input() isRequired!: boolean
	@Input() label!: string
	@Input() error!: boolean
	@Input() placeHolder!: string
	@Input() designation!: string
	@Input() validationMessages!: any[]
	@Input() showError: any
	@Input() isFormSubmitted!: boolean
	@Input() items: any;
	@Output() onSelectEvent = new EventEmitter<string>()
	@Output() onCloseSelectedEvent = new EventEmitter<string>()

	constructor() {
		this.svgs = SVGs
	}

	ngOnInit(): void {}

	onClickedOutside() {
		this.dropdownPopoverShow = false
	}

	//To toggle DropDown
	toggleDropdown(event: Event) {
		event.preventDefault()
		this.dropdownPopoverShow = !this.dropdownPopoverShow
	}

	//To hide DropDown on press on Esc
	@HostListener(ConstantClass.document.keydown, ['$event']) onKeydownHandler(event: KeyboardEvent) {
		if (event.key.toLowerCase() === ConstantClass.escapeKey) {
			this.dropdownPopoverShow = false
		}
	}

	//On click on any DropDown item
	onClick(item: any, index?: number) {
		this.dropdownPopoverShow = false

		this.onSelectEvent.emit(item)
	}

	onCloseSelected() {
		this.onCloseSelectedEvent.emit()
	}
}
