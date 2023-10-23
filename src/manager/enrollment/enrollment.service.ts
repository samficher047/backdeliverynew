import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/admin/company/entities/company.entity';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { Repository } from 'typeorm';
import { Store } from 'src/admin/store/entities/store.entity';
import { User } from 'src/auth/entities/user.entity';
import { HoursOperation } from 'src/admin/hours-peration/entities/hours-peration.entity';
import handleDbExceptions from 'src/common/exceptions/error.db.exception';
import { CompanyCategory } from 'src/admin/company-category/entities/company-category.entity';
import { Category } from '../../admin/category/entities/category.entity';
import { TypesRol } from '../../common/glob/types';
import { ErrorCode } from 'src/common/glob/error';

@Injectable()
export class EnrollmentService {

  private readonly logger = new Logger('EnrollmentService');

  constructor(

    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,

    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,

    @InjectRepository(CompanyCategory)
    private readonly companyCategoryRepository: Repository<CompanyCategory>,

    @InjectRepository(HoursOperation)
    private readonly hoursOperationRepository: Repository<HoursOperation>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(user: User, createEnrollmentDto: CreateEnrollmentDto) {

    const { name } = createEnrollmentDto;

    if (user.roles.includes(TypesRol.deliveryman)) {
      throw new BadRequestException({ codeError: ErrorCode.DELIVERYMANCANNOTBEMANAGER });
    }

    const company = await this.companyRepository.createQueryBuilder().where('UPPER(name) = :name', { name: name.toLocaleUpperCase() }).getOne();
    if (company)
      throw new BadRequestException({ codeError: ErrorCode.NAMEUNIQUE });

    const { categoryId } = createEnrollmentDto;
    try {
      const company = this.companyRepository.create(createEnrollmentDto);
      company.user = user;
      await this.companyRepository.save(company);

      const store = this.storeRepository.create(createEnrollmentDto);
      store.user = user;
      store.company = company;
      await this.storeRepository.save(store);

      const companyCategory = this.companyCategoryRepository
        .create({ company, category: { id: categoryId } });
      await this.companyCategoryRepository.save(companyCategory);

      for (let day = 0; day < 7; day++) {
        const hoursOperation = this.hoursOperationRepository.create({ store, day });
        await this.hoursOperationRepository.save(hoursOperation);
      }

      if (!user.roles.includes(TypesRol.manager)) {
        this.userRepository.createQueryBuilder('uss')
          .update({ roles: [...user.roles, TypesRol.manager] })
          .where({ id: user.id }).execute();
      }

      return { company }

    } catch (error) {
      handleDbExceptions(error, this.logger);
    }
  }

  async getCategories() {
    // await new Promise(resolve => setTimeout(resolve, 3000));
    const categories = await this.categoryRepository.find();
    return { categories };
  }

}
