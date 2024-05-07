import { model, models, Schema } from 'mongoose';

export interface ActionResult {
  actionConfigId: string;
  result: any;
}

const ActionResultSchema = new Schema<ActionResult>(
  {
    actionConfigId: {
      type: String,
      required: true,
    },
    result: {},
  },
  { timestamps: true },
);

const ActionResult =
  models.ActionResult || model('ActionResult', ActionResultSchema);
export default ActionResult;
