export class CreateMeetingDto {
  theme: string;

  description: string;
  tags: string[];

  place: string;
  time: Date;
}
