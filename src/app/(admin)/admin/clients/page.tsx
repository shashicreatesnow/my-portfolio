import { ClientsManager } from "@/components/admin/clients/clients-manager";
import { getAllClients } from "@/lib/queries/clients";

export default async function AdminClientsPage() {
  const clients = await getAllClients();
  return <ClientsManager clients={clients} />;
}
