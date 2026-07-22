"use client"
import { redirect } from "next/navigation";

export default function AdminRedirect() {
    redirect("/dashboard/admin");
}
/*did we make any changes here? just for the development*/
