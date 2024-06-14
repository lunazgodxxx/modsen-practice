export class CreateMeetupDto {
  theme: string;
  description: string;
  tags: string[];

  place: string;
  time: Date;
}
