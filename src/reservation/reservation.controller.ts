import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { Req } from "@nestjs/common";
import { Request, Response } from "express";
import { ReservationDto } from "./dto/reservation.dto";
import { UpdateReservationDto } from "./dto/update-reservation.dto";
import { UserRoles } from "src/user/entity/enum/roles.enum";
import { Roles } from "src/user/roles.decorator";
import { ReservationService } from "./reservation.service";
import { GetCurrentUser } from "src/auth/decorator/get-current-user.decorator";
import { GetManyDto } from "src/user/dto/get-many-user.dto";
import { UpdateManyReservationDto } from "./dto/update-many-reservation.dto";
import { Public } from "src/auth/decorator/public.decorator";
@ApiTags("Reservation")
@ApiBearerAuth()
@Controller("reservation")
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  @Roles(UserRoles.ADMIN, UserRoles.RECEPTIONIST)
  async getAll(@Req() req: Request) {
    return await this.reservationService.getList(req.query);
  }
  @Get("/:id")
  @Roles(UserRoles.ADMIN, UserRoles.RECEPTIONIST)
  async getById(@Param("id") id: number) {
    const reservation = await this.reservationService.getOne(id);
    if (reservation) {
      return reservation;
    } else {
      throw new HttpException("Bad request", HttpStatus.BAD_REQUEST);
    }
  }
  @Public()
  @Get("app/data")
  async getApiData(@Req() req: Request) {
    return await this.reservationService.getApiData();
  }
  @Post("getMany")
  @Roles(UserRoles.ADMIN, UserRoles.RECEPTIONIST)
  getMany(@Body() body: GetManyDto) {
    const { ids } = body;
    const result = this.reservationService.getMany(ids);
    if (result) {
      return result;
    } else {
      throw new HttpException("Bad request", HttpStatus.BAD_REQUEST);
    }
  }

  @Patch("/:id")
  @Roles(UserRoles.ADMIN, UserRoles.RECEPTIONIST)
  async update(
    @Param("id") id: number,
    @Body() body: UpdateReservationDto,
    @Res() res: Response
  ) {
    if (body.dateFrom > body.dateTo)
      throw new HttpException("Invalid date input", HttpStatus.BAD_REQUEST);
    const updatedReservation = await this.reservationService.update(id, body);
    if (updatedReservation) {
      res.send(updatedReservation);

      const text = `Azurirana rezervacija id:${updatedReservation.data.id}, ime:${updatedReservation.data.name}, broj osoba:${updatedReservation.data.personNumber}, broj vegana:${updatedReservation.data.veganNumber}, od:${updatedReservation.data.dateFrom}, do:${updatedReservation.data.dateTo}, programi:[${updatedReservation.data["titles"]}], tip obroka:${updatedReservation.data.food.name}, tip placanja:${updatedReservation.data.payment.type}
          `;

      await this.reservationService.newReservationEmail(text);
    } else {
      throw new HttpException("Bad request", HttpStatus.BAD_REQUEST);
    }
  }
  @Post("updateMany")
  @Roles(UserRoles.ADMIN, UserRoles.RECEPTIONIST)
  updateMany(@Body() body: UpdateManyReservationDto) {
    const updatedReservation = this.reservationService.updateMany(
      body.updateData
    );
    if (updatedReservation) {
      return updatedReservation;
    } else {
      throw new HttpException("Bad request", HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  @Roles(UserRoles.ADMIN, UserRoles.RECEPTIONIST)
  async create(@Body() body: ReservationDto, @Res() res: Response) {
    if (body.dateFrom > body.dateTo)
      throw new HttpException("Invalid date input", HttpStatus.BAD_REQUEST);
    const reservation = await this.reservationService.create(body);
    const result = await this.reservationService.getOne(reservation.id);
    res.send(result);

    if (result) {
      const text = `Nova rezervacija id:${reservation.id}, ime:${reservation.name}, broj osoba:${reservation.personNumber}, broj vegana:${reservation.veganNumber}, od:${reservation.dateFrom}, do:${reservation.dateTo}, programi:[${result.data["titles"]}], tip obroka:${reservation.food.name}, tip placanja:${reservation.payment.type}
          `;

      await this.reservationService.newReservationEmail(text);
    }
  }

  @Delete("/:id")
  @Roles(UserRoles.ADMIN, UserRoles.RECEPTIONIST)
  async deleteUser(@Param("id") id: number) {
    return await this.reservationService.delete(id);
  }
  @Post("deleteMany")
  @Roles(UserRoles.ADMIN, UserRoles.RECEPTIONIST)
  async deleteMany(@Body() body: GetManyDto) {
    const { ids } = body;
    return await this.reservationService.deleteMany(ids);
  }

  @Get("get/notification")
  async getReservationByRole(@GetCurrentUser() user: any) {
    try {
      const role = user.role;
      if (role) {
        const data = await this.reservationService.findReservationByRole(role);
        if (data.data.length) {
          console.log(data);

          return data;
        } else return;
      }
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  @Get("report/country")
  @Roles(UserRoles.ADMIN)
  async getReportByCountry(@Query() query) {
    const report = await this.reservationService.getReportByCountry(query);
    if (report) {
      return report;
    } else {
      throw new HttpException("Bad request", HttpStatus.BAD_REQUEST);
    }
  }
  @Get("report/cash")
  @Roles(UserRoles.ADMIN)
  async getReportByCash(@Query() query) {
    const report = await this.reservationService.getReportByCash(query);
    if (report) {
      return report;
    } else {
      throw new HttpException("Bad request", HttpStatus.BAD_REQUEST);
    }
  }
}
