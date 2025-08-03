import { Badge } from "@/components/ui/badge";
import { getCategoies } from "@/features/categories/db/categories";


const CategoriesAdminPage = async () => {
   
    const categories = await getCategoies()

const activeCategoryCount =  categories.filter((c)=> c.status === 'Active').length
const inactiveCategoryCount =  categories.filter((c)=> c.status === 'Active').length

    return (
        <div className="p-4 sm:p-6 space-y-6">
            {/* Category Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl sm:text-3xl font-bold">Category Management</h1>
                    <p className="text-sm text-muted-foreground">Organize your product categories efficiently</p>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                    <Badge variant='outline' className="px-2 sm:px-3 py-1 text-xs sm:text-sm">
                         <span className="font-semibold text-green-600">{activeCategoryCount}</span>
                        Active
                    </Badge>
                    <Badge variant='outline' className="px-2 sm:px-3 py-1 text-xs sm:text-sm">
                         <span className="font-semibold text-red-500">{inactiveCategoryCount}</span>
                        Incative
                    </Badge>
                    <Badge variant='outline' className="px-2 sm:px-3 py-1 text-xs sm:text-sm">
                        <span className="font-semibold text-blue-600">{categories.length}</span>
                        Total
                    </Badge>
                </div>
            </div>

            {/* Form */}
            <div>Form</div>
        </div>
    );
};

export default CategoriesAdminPage;
