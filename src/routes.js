import ListPage from "./pages/ListPage";
import HomePage from "./pages/HomePage";
import WritePage from "./pages/WritePage";
import EditPage from "./pages/EditPage";
import DetailPage from "./pages/DetailPage";
import AdminPage from "./pages/AdminPage";
import NotFoundPage from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/blogs",
    element: <ListPage />,
  },
  {
    path: "/blogs/write",
    element: <WritePage />,
    auth: true,
  },
  {
    path: "/blogs/:id",
    element: <DetailPage />,
  },
  {
    path: "/blogs/:id/edit",
    element: <EditPage />,
    auth: true,
  },
  {
    path: "/admin",
    element: <AdminPage />,
    auth: true,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export default routes;
