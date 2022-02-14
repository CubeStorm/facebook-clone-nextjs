import * as React from 'react';
import { useState } from 'react';
import { useAuth } from '@hooks/useAuth';

import { Formik } from 'formik';
import { Input } from '@components/auth/Input';
import { Button } from '@components/Button';
import { RequestErrors } from '@components/auth/RequestErrors';

import { LoginSchema } from '@validation/LoginSchema';
import { AuthMiddleware } from '@enums/AuthMiddleware';


export const LoginForm: React.FC = () => {
    const [requestErrors, setRequestErrors] = useState([]);
    const { login, isRequestLoading } = useAuth({ middleware: AuthMiddleware.GUEST });

    const handleSubmit = (email: string, password: string) => {
        login({
            email,
            password,
            setErrors: setRequestErrors
        })
    }

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={({ email, password }) => handleSubmit(email, password)}
        >
            {({ values, handleChange, handleBlur, handleSubmit }) => (
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
                    <p className="text-xl text-light-100 font-bold">LOGIN</p>

                    <Input
                        type="email"
                        name="email"
                        value={values.email}
                        placeholder="Adres e-mail"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />

                    <Input
                        type="password"
                        name="password"
                        value={values.password}
                        placeholder="Password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />

                    <RequestErrors errors={requestErrors} />

                    <div className="min-w-[210px] w-full">
                        <Button
                            type="submit"
                            title="Login"
                            isDisabled={isRequestLoading}
                            callback={handleSubmit}
                        />
                    </div>
                </form>
            )}
        </Formik>
    );
}