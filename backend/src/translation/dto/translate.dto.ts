import { IsIn, IsNotEmpty } from 'class-validator';

export class TranslateDto {
  @IsNotEmpty()
  text: string;

  @IsIn(['en', 'uk', 'es', 'it'])
  targetLang: string;
}