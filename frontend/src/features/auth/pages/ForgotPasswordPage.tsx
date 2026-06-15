import React from 'react';
import { useTranslation } from 'react-i18next';
import { AuthLayout } from '../components/AuthLayout';
import { useForgotPassword } from '../hooks/useForgotPassword';
import { ForgotPasswordForm } from '../components/ForgotPasswordForm';
import { SuccessMessage } from '../components/SuccessMessage';

export const ForgotPasswordPage: React.FC = () => {
  const { t } = useTranslation();
  const { email, setEmail, isLoading, isSent, error, handleSubmit } = useForgotPassword();

  return (
    <AuthLayout 
      title={t('forgotPasswordTitle')}
      subtitle={t('forgotPasswordSubtitle')}
    >
      {!isSent ? (
        <ForgotPasswordForm
          email={email}
          setEmail={setEmail}
          isLoading={isLoading}
          error={error}
          onSubmit={handleSubmit}
        />
      ) : (
        <SuccessMessage />
      )}
    </AuthLayout>
  );
};