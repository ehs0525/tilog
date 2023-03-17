import ListPage from "./pages/ListPage";
import HomePage from "./pages/HomePage";
import WritePage from "./pages/WritePage";
import EditPage from "./pages/EditPage";
import DetailPage from "./pages/DetailPage";
import AdminPage from "./pages/AdminPage";

const routes = [
  {
    path: "/",
    component: <HomePage />,
  },
  {
    path: "/blogs",
    component: <ListPage />,
  },
  {
    path: "/blogs/write",
    component: <WritePage />,
  },
  {
    path: "/blogs/:id",
    component: <DetailPage />,
  },
  {
    path: "/blogs/:id/edit",
    component: <EditPage />,
  },
  {
    path: "/admin",
    component: <AdminPage />,
  },
];

export default routes;
