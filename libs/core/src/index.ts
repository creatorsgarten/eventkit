export { Event } from './core/event/Event'

export { Module } from './core/module/Module'
export { IModuleMeta, Meta } from './core/module/ModuleMeta'

export { EventBus } from './core/registry/EventBus'
export { DynamicRegistry } from './core/registry/DynamicRegistry'
export { Registry, createRegistry } from './core/registry/Registry'

export { createStore } from './core/store/Store'
export { createEvent } from './utils/createEvent'

export { DuplicateModuleError } from './errors/DuplicateExtensionError'

export type { Store } from './@types/store/Store'

export { EventStatus } from './@types/event/EventStatus'
export type { EventType } from './@types/event/EventType'
export type { IEvent, CreateEventInput } from './@types/event/IEvent'

export type { RegistryOf } from './@types/registry/RegistryOf'
export type { IRegistry, ModuleC } from './@types/registry/IRegistry'
