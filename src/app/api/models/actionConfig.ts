import { model, models, Schema } from 'mongoose';

export interface ActionConfig {
  url: string;
  action: string;
  triggerInput?: string;
  triggerInputValue?: string;
}

const ActionConfigSchema = new Schema<ActionConfig>(
  {
    url: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      enum: ['GET'],
      required: true,
    },
    triggerInput: {
      type: String,
    },
    triggerInputValue: {
      type: String,
    },
  },
  { timestamps: true },
);

const ActionConfig =
  models.ActionConfig || model('ActionConfig', ActionConfigSchema);
export default ActionConfig;
