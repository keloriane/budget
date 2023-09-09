'use client'
import Image from 'next/image'
import {useRouter} from "next/navigation";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod";
import {useForm} from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {Button} from "@/components/ui/button";


export default function Home() {

    const router = useRouter()
  const FormSchema = z.object({
    email: z.string().email(),
    username: z.string().min(3).max(20),
    password: z.string().min(6).max(100),
    firstname: z.string().min(3).max(20),
    lastname: z.string().min(3).max(20),
  });



      const form = useForm <z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            username: '',
            password: '',
            firstname: '',
            lastname: '',

        }
      })
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
          console.log(values);
          const response = await fetch('http://localhost:3000/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: values.username,
              email: values.email,
              password: values.password,
              firstname: values.firstname,
              lastname: values.lastname,
            })
        })
        if(response.ok) {
          router.push('/login')
        } else {
            console.log('Error')
        }
  }


  return (
    <main className="w-full h-[100vh] flex items-center justify-center">
        <div className={"w-[700px] m-auto"}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    <FormField
                        control={form.control}
                        name="firstname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>FirstName</FormLabel>
                                <FormControl>
                                    <Input placeholder="firstname" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Lastname</FormLabel>
                                <FormControl>
                                    <Input placeholder="lastname" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="username" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
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
                                    <Input type={"password"} placeholder="password" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" >Submit</Button>
                </form>
            </Form>
        </div>
    </main>
  )
}
