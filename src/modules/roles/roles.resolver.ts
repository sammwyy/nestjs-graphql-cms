import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';

import { Role } from './schema/role';
import { RolesService } from './roles.service';
import CreateRoleDTO from './dto/create-role.dto';
import UpdateRoleDTO from './dto/update-role.dto';

@Resolver(() => Role)
export class RolesResolver {
  constructor(private rolesService: RolesService) {}

  @Query(() => Role)
  @UseGuards(GqlAuthGuard)
  public getRole(@Args('id') id: string): Promise<Role> {
    return this.rolesService.getByID(id);
  }

  @Query(() => [Role])
  @UseGuards(GqlAuthGuard)
  public getRoles(): Promise<Role[]> {
    return this.rolesService.getAll();
  }

  @Mutation(() => Role)
  @UseGuards(GqlAuthGuard)
  public createRole(@Args('payload') payload: CreateRoleDTO): Promise<Role> {
    return this.rolesService.create(payload);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  public updateRole(
    @Args('roleId') roleId: string,
    @Args('payload') payload: UpdateRoleDTO,
  ): Promise<boolean> {
    return this.rolesService.update(roleId, payload);
  }
}
