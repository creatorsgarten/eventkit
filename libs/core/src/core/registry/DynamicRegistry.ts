import { DuplicateModuleError, Module } from '@eventkit/core'

import { EventBus } from './EventBus'

import { IRegistry, ModuleC } from '../../@types/registry/IRegistry'

export class DynamicRegistry implements IRegistry<Module[]> {
  modules: Module[] = []
  bus = new EventBus()

  get(id: string) {
    return this.modules.find((m) => m.meta.id === id) ?? null
  }

  register<T extends Module>(module: T) {
    if (this.get(module.meta.id)) throw new DuplicateModuleError(module)

    module.registry = this
    module.bus = this.bus

    this.modules.push(module)
  }

  use<T extends ModuleC>(module: T, ...args: ConstructorParameters<T>) {
    this.register(new module(...args))
  }

  of<T extends ModuleC>(Module: T) {
    const modules = this.modules.find((m) => m instanceof Module) ?? null

    return modules as InstanceType<T> | null
  }

  has<T extends ModuleC>(module: T) {
    return this.modules.some((m) => m instanceof module)
  }

  get data() {
    const data: Record<string, any> = {}

    this.modules.forEach((module) => {
      data[module.meta.id] = module.data
    })

    return data
  }

  ready() {
    this.modules.forEach((m) => m.onSetup?.())
  }
}
