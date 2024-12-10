import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface AlertToastProps {
  title: string;
  description: string;
  variant?: 'default' | 'destructive';
}

export function AlertToast({ title, description, variant = 'default' }: AlertToastProps) {
  return (
    <Alert variant={variant}>
      {variant === 'destructive' ? (
        <AlertCircle className="h-4 w-4" />
      ) : (
        <CheckCircle2 className="h-4 w-4" />
      )}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}