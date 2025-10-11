import AuthHeader from '@/features/auths/components/auth-header'
import ForgotPasswordFrom from '@/features/auths/components/forgot-password-from'


const ForgotPasswrodPage = () => {
  return (
   <AuthHeader type="forgot-password">
    <ForgotPasswordFrom/>
   </AuthHeader>
  )
}

export default ForgotPasswrodPage