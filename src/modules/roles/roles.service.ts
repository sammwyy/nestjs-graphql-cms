import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Role, RoleDocument } from './schema/role';
import CreateRoleDTO from './dto/create-role.dto';
import UpdateRoleDTO from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name)
    private readonly roleModel: Model<RoleDocument>,
  ) {}

  public getAll(): Promise<Role[] | undefined> {
    return this.roleModel.find({}).exec();
  }

  public getByID(id: string): Promise<Role | undefined> {
    if (!isValidObjectId(id)) {
      return null;
    }
    return this.roleModel.findOne({ _id: id }).exec();
  }

  public async create(payload: CreateRoleDTO): Promise<Role> {
    const user = new this.roleModel(payload);
    await user.save();
    return user;
  }

  public async update(
    roleID: string,
    payload: UpdateRoleDTO,
  ): Promise<boolean> {
    await this.roleModel.findByIdAndUpdate(roleID, payload);
    return true;
  }
}
