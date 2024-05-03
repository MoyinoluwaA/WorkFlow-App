'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import WorkflowCard from './components/workflowCard';
import Sidebar from './components/workflowSidebar';
import Navbar from './components/Navbar';

export default function Home() {
  const defaultWorkflow = [
    {
      type: 'Trigger',
      text: 'Incoming API Call',
    },
    {
      type: 'Action',
      text: 'Outgoing Api Call',
    },
  ];

  const { data: session } = useSession();
  const [workflow, setWorkflow] = useState(defaultWorkflow);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleWorkflowCardClick = () => {
    setShowSidebar(true);
  };

  return (
    <>
      <Navbar session={session} />
      <main className="relative py-[200px]">
        <h1 className="mb-5 text-center text-xl font-bold">
          Automate your tasks with our Workflow APP
        </h1>
        <div className="mx-auto w-[90%] sm:w-[450px]">
          {workflow.map((workflowItem, index) => {
            return (
              <WorkflowCard
                type={workflowItem.type}
                text={workflowItem.text}
                id={index}
                workflow={workflow}
                setWorkflow={setWorkflow}
                handleWorkflowCardClick={handleWorkflowCardClick}
                key={index}
              />
            );
          })}
        </div>
        {showSidebar && (
          <Sidebar workflow={workflow} setShowSidebar={setShowSidebar} />
        )}
      </main>
    </>
  );
}
