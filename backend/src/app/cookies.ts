
export const cookieMiddleware = async (req: any, res: any, next: any) => {
  // Get cookie
  const uuid = req.cookies["tp-uuid"];

  if(
    uuid 
    || (req.path === '/user' && req.method === "PUT")
    || (req.path === '/user/state' && req.method === "GET")
  ) {
    next();
  }
  else {
    return res.status(401).end();
  }
}