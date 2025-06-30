import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CourseManagement } from "./course-management"

export default function AdminDashboard() {
  return (
    <Tabs defaultValue="users" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
        <TabsTrigger value="courses">Course Management</TabsTrigger>
      </TabsList>
      <TabsContent value="users">Users content</TabsContent>
      <TabsContent value="settings">Settings content</TabsContent>
      <TabsContent value="courses">
        <CourseManagement />
      </TabsContent>
    </Tabs>
  )
}
