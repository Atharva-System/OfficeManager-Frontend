export class Regex{
   static emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
   static numericPattern = /^[0-9]*$/;
   static passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
}