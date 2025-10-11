'use client'

import InputForm from '@/components/shared/input-form'
import SubmitBtn from '@/components/shared/submit-btn'
import { CardContent, CardFooter } from '@/components/ui/card'
import Form from 'next/form'
import React from 'react'
import { forgotPasswordAction } from '../actions/auths'
import { useForm } from '@/hooks/use-form'

const ForgotPasswordFrom = () => {
  const {formAction, isPending} =  useForm(forgotPasswordAction, "/auth/signin/")
    return (
        <Form action={formAction}>
            <CardContent>
                <InputForm label='อีเมล' id='email' type='email' required />
            </CardContent>
            <CardFooter className='pt-6'>
                <SubmitBtn name='ส่งลิงค์เผื่อรีเซ็ตรหัสผ่าน' className='w-full' pending={isPending} />
            </CardFooter>
        </Form>
    )
}

export default ForgotPasswordFrom