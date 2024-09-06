'use client';

import { Button } from '@/components/ui/button';
import Form, { useZodForm } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { addComment } from '@/lib/actions/comment';
import { CommentInput, commentSchema } from '@/lib/validations/profile-schema';
import { STATE_STATUS } from '@/types';
import { LoaderCircle } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function AddComment() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [status, setStatus] = useState<STATE_STATUS>(STATE_STATUS.IDLE);
  const form = useZodForm({
    schema: commentSchema,
    defaultValues: { message: '' }
  });

  async function onSubmit(data: CommentInput) {
    setStatus(STATE_STATUS.LOADING);
    try {
      const comment = await addComment(params.id, data);
      if (!comment) {
        toast.error('Error!', { description: 'Please trt again' });
        setStatus(STATE_STATUS.ERROR);
        return;
      }

      setStatus(STATE_STATUS.SUCCESS);
      router.refresh();
      return;
    } catch (error) {
      setStatus(STATE_STATUS.ERROR);
      toast.error('Error!', { description: 'Please trt again' });

      return;
    }
  }

  return (
    <div className="w-full pt-6">
      <Form form={form} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex w-full flex-col gap-4 rounded-lg border bg-input p-3 focus-within:ring-1 focus-within:ring-ring">
          <Textarea
            id="message"
            placeholder="Type your message here..."
            className="resize-none border-0 p-0 shadow-none focus:outline-none focus-visible:ring-0"
            {...form.register('message')}
          />
          <div className="flex items-center">
            <Button
              type="submit"
              size="sm"
              className="ml-auto gap-1.5"
              disabled={
                !form.formState.isDirty ||
                !form.formState.isValid ||
                status === STATE_STATUS.LOADING
              }
            >
              {status === STATE_STATUS.LOADING && (
                <LoaderCircle className="size-4 animate-spin" />
              )}
              Comment
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
