'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomInput from './CustomInput';
import { authFormSchema } from '@/lib/utils';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signIn, signUp } from '@/lib/actions/user.actions';

const AuthForm = ({ type }: { type: string }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const formSchema = authFormSchema(type);
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log("onsubmit clicked")
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setIsLoading(true);
        console.log(values);
        try {
            //sign up with appwrite & create plaid token
            if (type === 'sign-up') {
                const userData = {
                    firstName: values.firstName!,
                    lastName: values.lastName!,
                    address: values.address!,
                    city: values.city!,
                    state: values.state!,
                    postalCode: values.postalCode!,
                    dateOfBirth: values.dateOfBirth!,
                    ssn: values.ssn!,
                    email: values.email,
                    password: values.password
                }

                const newUser = await signUp(userData);
                setUser(newUser);
                setTimeout(() => {
                    router.push('/sign-in');
                }, 1200);
            }
            if (type === 'sign-in') {
                const response = await signIn({ email: values.email, password: values.password });
                if (response) router.push('/');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <section className='auth-form'>
            <header className='flex flex-col gap-5 md:gap-8'>
                <Link href="" className='cursor-pointer flex items-center gap-2'>
                    <Image alt='logo' src="/icons/logo.svg" width={34} height={34} className='size-[40px] max-xl:size-20' />
                    <h1 className='text-[20px] font-bold text-black-1'>Next X Bank</h1>
                </Link>
                <div className="flex flex-col gap-1 md:gap-3">
                    <h1 className="text-24 lg:text-36 font-semibold text-gray-900">{user ? 'Link Account' : type === 'sign-in' ? "Sign In" : "Sign UP"}
                        <p className='text-16 font-normal text-gray-600'>
                            {user ? 'Link your account to get started' : 'Please enter your details'}
                        </p>
                    </h1>
                </div>
            </header>
            {user ? (
                <div className="flex flex-col gap-4"></div>
            ) : (
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            {
                                type === 'sign-up' && (<>
                                    <div className="flex gap-4">
                                        <CustomInput control={form.control} name="firstName" label="First Name" placeholder="Enter your First Name" />
                                        <CustomInput control={form.control} name="lastName" label="Last Name" placeholder="Enter your Last Name" />
                                    </div>
                                    <CustomInput control={form.control} name="address" label="Address" placeholder="Enter your Address" />
                                    <CustomInput control={form.control} name="city" label="City" placeholder="Enter your City" />
                                    <div className="flex gap-4">
                                        <CustomInput control={form.control} name="state" label="State" placeholder="ex : NY" />
                                        <CustomInput control={form.control} name="postalCode" label="Postal Code" placeholder="Enter your Postal Code" />
                                    </div>
                                    <div className="flex gap-4">
                                        <CustomInput control={form.control} name="dateOfBirth" label="Date of Birth" placeholder="yyyy-mm-dd" />
                                        <CustomInput control={form.control} name="ssn" label="SSN" placeholder="ex : 1234" />
                                    </div>
                                </>)
                            }
                            <CustomInput control={form.control} name="email" label="Email" placeholder="Enter your email" />
                            <CustomInput control={form.control} name="password" label="Password" placeholder="Enter your password" />

                            <Button type="submit" className='form-btn' disabled={isLoading}>
                                {
                                    isLoading ? (
                                        <>
                                            <Loader size={20} className='animate-spin invert' />
                                            &nbsp; Loading...
                                        </>
                                    ) : (
                                        <div className='text-white'>
                                            {type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                                        </div>)
                                }
                            </Button>
                        </form>
                    </Form>
                    <footer className="flex justify-center gap-1">
                        <p className="text-14 font-normal text-gray-600">
                            {type === 'sign-in'
                                ? "Don't have an account?"
                                : "Already have an account?"}
                        </p>
                        <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className="form-link">
                            {type === 'sign-in' ? 'Sign up' : 'Sign in'}
                        </Link>
                    </footer>
                </>
            )}
        </section>
    )
}

export default AuthForm
