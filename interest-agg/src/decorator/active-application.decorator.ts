import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const ActiveApplication = createParamDecorator(
  (field: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const application = request['application'];
    return field ? application?.[field] : application;
  },
);
