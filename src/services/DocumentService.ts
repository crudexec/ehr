import { AppDataSource } from '../database/data-source';
import { Document, DocumentType } from '../database/entities/Document';
import { NotFoundError } from '../utils/errors';

export class DocumentService {
  private documentRepository = AppDataSource.getRepository(Document);

  async create(
    userId: string,
    data: {
      fileName: string;
      originalName: string;
      fileUrl: string;
      fileSize: number;
      mimeType: string;
      type?: DocumentType;
      relatedEntityId?: string;
      relatedEntityType?: string;
    }
  ): Promise<Document> {
    const document = this.documentRepository.create({
      ...data,
      userId,
    });

    return this.documentRepository.save(document);
  }

  async findById(id: string): Promise<Document> {
    const document = await this.documentRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!document) {
      throw new NotFoundError('Document not found');
    }

    return document;
  }

  async findByUserId(userId: string): Promise<Document[]> {
    return this.documentRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findByRelatedEntity(entityId: string, entityType: string): Promise<Document[]> {
    return this.documentRepository.find({
      where: {
        relatedEntityId: entityId,
        relatedEntityType: entityType,
      },
      order: { createdAt: 'DESC' },
    });
  }

  async delete(id: string): Promise<void> {
    const document = await this.findById(id);
    await this.documentRepository.softRemove(document);
  }
}

export default new DocumentService();
