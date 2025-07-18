export const authorizeRoles = (...roles) => {
    console.log('roless',roles);
    
    return (req, res, next) => {
        console.log('roless',req.user.role);
        
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to access this resource",
        });
      }
      next();
    };
  };