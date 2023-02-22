import { ModuleRef } from '@nestjs/core';
export declare class AuthModule {
    private moduleRef;
    constructor(moduleRef: ModuleRef);
    onModuleInit(): void;
}
