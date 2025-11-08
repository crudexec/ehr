import { AppDataSource } from '../database/data-source';
import { IntakeForm } from '../database/entities/forms/IntakeForm';
import { NotFoundError } from '../utils/errors';
import { FormStatus, PaginationParams } from '../types';

export class IntakeFormService {
  private formRepository = AppDataSource.getRepository(IntakeForm);

  async create(userId: string, data: Partial<IntakeForm>): Promise<IntakeForm> {
    const form = this.formRepository.create({
      ...data,
      userId,
      status: FormStatus.DRAFT,
    });

    return this.formRepository.save(form);
  }

  async findById(id: string): Promise<IntakeForm> {
    const form = await this.formRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!form) {
      throw new NotFoundError('Intake form not found');
    }

    return form;
  }

  async findByUserId(
    userId: string,
    params: PaginationParams
  ): Promise<{ forms: IntakeForm[]; total: number }> {
    const { page, limit } = params;
    const skip = (page - 1) * limit;

    const [forms, total] = await this.formRepository.findAndCount({
      where: { userId },
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
      relations: ['user'],
    });

    return { forms, total };
  }

  async update(id: string, data: Partial<IntakeForm>): Promise<IntakeForm> {
    const form = await this.findById(id);
    Object.assign(form, data);
    return this.formRepository.save(form);
  }

  async updateStatus(id: string, status: FormStatus): Promise<IntakeForm> {
    const form = await this.findById(id);
    form.status = status;
    return this.formRepository.save(form);
  }

  async delete(id: string): Promise<void> {
    const form = await this.findById(id);
    await this.formRepository.softRemove(form);
  }
}

export default new IntakeFormService();
