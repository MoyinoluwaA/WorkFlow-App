import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { GoPlus } from 'react-icons/go';
import { PiLineVerticalThin } from 'react-icons/pi';
import { LiaLongArrowAltDownSolid } from 'react-icons/lia';
import { CiMenuKebab } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import Button from './Button';

export interface WorkflowCard {
  type: string;
  text: string;
}

interface WorkflowCardProps {
  type: string;
  text: string;
  id: number;
  workflow: Array<WorkflowCard>;
  setWorkflow: Function;
  handleWorkflowCardClick: React.MouseEventHandler<HTMLDivElement>;
}

const WorkflowCard = ({
  type,
  text,
  id,
  workflow,
  setWorkflow,
  handleWorkflowCardClick,
}: WorkflowCardProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [showWorkflowItemList, setShowWorkflowItemList] = useState(false);

  const handleWorkflowItemAdd = () => {
    let updatedWorkflow;
    const newWorkFlowItem = {
      type: 'Action',
      text: 'Use body text',
      id: id + 1,
    };

    if (workflow.length - 1 === id) {
      updatedWorkflow = [...workflow];
      updatedWorkflow.push(newWorkFlowItem);
    } else {
      const previousWorkflowItems = [...workflow].slice(0, id + 1);
      const afterWorkflowItems = [...workflow].slice(id + 1, workflow.length);
      updatedWorkflow = [
        ...previousWorkflowItems,
        newWorkFlowItem,
        ...afterWorkflowItems,
      ];
    }
    setWorkflow(updatedWorkflow);
  };

  const handleWorkflowItemDelete = () => {
    const updatedWorkflow = workflow.filter(
      (workflowItem, index) => index !== id,
    );

    setWorkflow(updatedWorkflow);
    setShowWorkflowItemList(false);
  };

  const workflowCardActions = [
    {
      name: 'Delete',
      icon: <MdDelete />,
      onClick: handleWorkflowItemDelete,
    },
  ];

  return (
    <>
      <div
        className="relative cursor-pointer"
        onClick={handleWorkflowCardClick}
      >
        <div className="flex items-center justify-between rounded-lg border border-gray-100 px-6 py-3">
          <div className="flex">
            <Image
              src="/images/structize.avif"
              alt="Structize Logo"
              width={48}
              height={48}
              priority
            />
            <div className="pl-4">
              <p className="text-md font-semibold">{type}</p>
              <p>{text}</p>
            </div>
          </div>
          <CiMenuKebab
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setShowWorkflowItemList((prev) => !prev);
            }}
          />
        </div>

        {showWorkflowItemList && (
          <div className="border-1 absolute right-[-108px] top-1 rounded-sm border px-3 py-2">
            <ul>
              {workflowCardActions.map((workflowCardAction, index) => (
                <li key={index}>
                  <Button
                    className="flex items-center p-0"
                    disableDefaultStyle={true}
                    onClick={workflowCardAction.onClick}
                  >
                    <span className="mr-2">{workflowCardAction.icon}</span>
                    <span>{workflowCardAction.name}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="workflow__add relative">
        <PiLineVerticalThin className="mx-auto" />
        <GoPlus
          className="mx-auto hover:cursor-pointer hover:rounded-full hover:border hover:bg-black hover:text-white"
          onMouseEnter={() => ref.current!.classList.remove('hidden')}
          onMouseLeave={() => ref.current!.classList.add('hidden')}
          onClick={handleWorkflowItemAdd}
        />
        <LiaLongArrowAltDownSolid className="mx-auto" />
        <span
          className="absolute left-[55%] top-3 hidden rounded-md bg-black px-3 py-1 text-white"
          ref={ref}
        >
          Add a step
        </span>
      </div>
    </>
  );
};

export default WorkflowCard;
