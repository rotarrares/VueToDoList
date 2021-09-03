import { createDecorator } from "vue-class-component";

/**
 * Create computed method out of normal method or create computed getters and setters for field;
 */
export const Computed = createDecorator((options, key) => {
  if (options.methods && options.methods[key]) {
    if (options.computed) {
      options.computed[key] = options.methods[key];
    }
    delete options.methods[key];
  }
});
