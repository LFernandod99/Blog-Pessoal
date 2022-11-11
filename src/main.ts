import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { validate } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Blog Pessoal')   // titulo
  .setDescription('Projeto do blog pessoal')    //descriçao
  .setContact('Generation brasil', 'www.genbr.com.br', 'fcosta.veiga@gmail.com')    //contato
  .setVersion('1.0')      //versao
  .addBearerAuth()
  .build()
  const document = SwaggerModule.createDocument(app, config) //ele vai criar um document com os dados de app e config
  SwaggerModule.setup('/swagger', app, document)    //rota

  process.env.TZ = '-03:00';                  // fuso horario
  app.useGlobalPipes(new ValidationPipe())   //
  app.enableCors()                          // para que a gente consiga acessar o codigo de outros locais
  await app.listen(process.env.PORT || 4000);                   // Porta que meu servidor vai rodar
}
bootstrap();

//O Swagger é uma biblioteca que permite a geração de um arquivo JSON que representa uma API a partir do código fonte.
// Assim,auxilia a descrição, consumo e visualização de serviços de uma API REST.