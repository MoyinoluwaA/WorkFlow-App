import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { AxiosResponse } from 'axios';
import JsonView from '@uiw/react-json-view';
import Button from './Button';
import InputGroup from './InputGroup';
import { sendApiRequest } from '../services';
import { WorkflowCard } from './workflowCard';

interface SidebarProps {
  workflow: Array<WorkflowCard>;
  setShowSidebar: Function;
}

export interface FormProps {
  action: string;
  url: string;
  triggerInput: string;
  triggerInputValue: string;
}

export interface Error {
  error: boolean;
  code: number;
  statusText: string;
  message: string;
}

const Sidebar = ({ workflow, setShowSidebar }: SidebarProps) => {
  const [form, setForm] = useState<FormProps>({
    action: 'GET',
    url: '',
    triggerInput: '',
    triggerInputValue: '',
  });
  const [triggerDisabled, setTriggerDisabled] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [jsonResult, setJsonResult] = useState<AxiosResponse | null>(null);

  useEffect(() => {
    validateForm(form);
  }, [form]);

  const validateForm = (form: FormProps) => {
    const { action, url, triggerInput, triggerInputValue } = form;
    if (action.length > 0 && url.length > 0) {
      if (triggerInputValue.length > 0 && triggerInput.length === 0) {
        return setTriggerDisabled(true);
      }
      setTriggerDisabled(false);
    } else {
      setTriggerDisabled(true);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleTrigger = async () => {
    setLoading(true);
    setJsonResult(null);
    setError(null);
    try {
      const res = await sendApiRequest(form);
      setError(null);
      setJsonResult(res!);
    } catch (error: any) {
      const res = JSON.parse(error.message);
      setError(res);
      setJsonResult(null);
    }
    setLoading(false);
  };

  const handleHideShowSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <div className="absolute right-0 top-0 z-10 flex h-full w-full flex-col overflow-y-auto bg-white py-8 shadow-2xl sm:w-[450px]">
      <MdClose
        className="absolute right-3 top-4 cursor-pointer text-3xl"
        onClick={handleHideShowSidebar}
      />
      <section>
        <h2 className="border-b p-3 text-xl font-semibold">
          {workflow[0].type}: {workflow[0].text}
        </h2>
        <Button
          onClick={handleTrigger}
          className="mx-3 my-5 bg-[#f9dd3e] disabled:opacity-50"
          disabled={triggerDisabled || loading}
        >
          Trigger Incoming API Call
        </Button>
        <p className="px-3 text-sm">
          Please fill in the details of the outgoing api call you want to make.
        </p>
      </section>

      <section>
        <h2 className="border-b p-3 text-xl font-semibold">
          {workflow[1].type}: {workflow[1].text}
        </h2>
        <form>
          <div className="px-3 pt-4">
            <div className="sm:col-span-3">
              <label
                htmlFor="label"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Select Action
              </label>
              <div className="mt-2">
                <select
                  id="label"
                  name="label"
                  className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option>Outgoing API Call GET</option>
                </select>
              </div>
            </div>
          </div>
          <div className="px-3 pt-4">
            <InputGroup
              label="URL"
              inputType="url"
              identifier="url"
              placeholder="https://api.structize.com/hello_world"
              value={form.url}
              onChange={handleChange}
            />
          </div>
          <div className="px-3 pt-4">
            <div className="sm:col-span-3">
              <label
                htmlFor="label"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Query Parameters
              </label>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InputGroup
                  label="triggerInput"
                  hideLabel={true}
                  inputType="text"
                  identifier="triggerInput"
                  placeholder="triggerInput"
                  value={form.triggerInput}
                  onChange={handleChange}
                />
                <InputGroup
                  label="triggerInputValue"
                  hideLabel={true}
                  inputType="text"
                  identifier="triggerInputValue"
                  placeholder="triggerInputValue"
                  value={form.triggerInputValue}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </form>
      </section>

      {loading && <span className="my-8 text-center">Fetching data....</span>}

      {error && error.error && (
        <div className="px-3 py-5">
          <p className="text-md font-bold">
            {error.statusText}: {error.code}
          </p>
          <p>{error.message}</p>
        </div>
      )}

      {jsonResult && (
        <section className="px-3 py-5">
          <h2 className="mb-4 border-b p-3 text-xl font-semibold">
            API Result
          </h2>
          <div className="h-[300px] overflow-y-scroll">
            <JsonView value={jsonResult} />
          </div>
        </section>
      )}
    </div>
  );
};

export default Sidebar;
