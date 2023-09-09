'use client'
import React from 'react';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";


    const FormSchema = z.object({
        email: z.string().min(1 , 'Email is required').email('Invalid Email'),
        password: z
            .string()
            .min(1, "Password is required")
            .min(6, "Password must have more than 6 characters")
    })
const Login:React.FC = () => {


        const router = useRouter();

    const form = useForm <z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        const loginData = await signIn('credentials' , {
            email: values.email,
            password: values.password,
            redirect:false
        });
        if(loginData?.error) {
            console.log(loginData)
        } else {
            router.push('/admin')
        }
    }

    return (
        <div className={"w-full h-[100vh] flex items-center justify-center"}>
            <div className={"w-[700px] m-auto"}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="email" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type={"password"} {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type={"submit"}> Log in </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default Login