import { BaseDto } from 'src/app/core/dtos/base.dto';

/**
 * Abstract class representing similar
 * interface as the ApiService provides.
 *
 * TODO: convert to separate interfaces?
 */
export abstract class FakeService<D extends BaseDto, C> {}
