<div className="navbar bg-info">
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl" to="/">
          FarmFromYou
        </Link>
        <div className="flex-none">
          <ul className="menu menu-horizontal p-0">
            {user ? (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/auth/signout"
                    className="nav-link"
                  >
                    Sign out
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/user/edit"
                    className="nav-link"
                  >
                    Edit
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/users"
                    className="nav-link"
                  >
                    Users
                  </NavLink>
                </li>
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src="https://shapka-youtube.ru/wp-content/uploads/2021/02/avatarka-dlya-skaypa-dlya-parney.jpg" alt="bla" />
                  </div>
                </div>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/auth/signup"
                    className="nav-link"
                  >
                    Sign Up
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/auth/signin"
                    className="nav-link"
                  >
                    Sign In
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
//------------------------------------------------------

было

<div className="d-flex justify-content-center">
      <form onSubmit={submitHandler}>
        <legend className="text-center mb-4">User Sign In</legend>
        <div className="mb-3">
          <input
            onChange={changeHandler}
            value={userSignIn.email}
            className="form-control"
            type="email"
            name="email"
            placeholder="Email"
          />
        </div>
        <div className="mb-3">
          <input
            onChange={changeHandler}
            value={userSignIn.password}
            className="form-control"
            type="password"
            name="password"
            placeholder="Pass"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
      </form>
    </div>





//-------------------было
 <div className="d-flex justify-content-center">
      <form onSubmit={submitHandler} className="d-flex flex-column align-items-center bg-light text-dark p-3 border rounded-3">
        <legend className="text-center mb-4">User Sign Up</legend>
        <div className="mb-3">
          <input onChange={changeHandler} className="form-control" value={userSignUp.email} type="email" name="email" placeholder="Email" />
        </div>
        <div className="mb-3">
          <input onChange={changeHandler} className="form-control" value={userSignUp.userName} type="text" name="userName" placeholder="Name" />
        </div>
        <div className="mb-3">
          <input onChange={changeHandler} className="form-control" value={userSignUp.password} type="password" name="password" placeholder="Pass" />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>





//---- navbar
<div class="navbar bg-base-100">
  <div class="flex-1">
    <a class="btn btn-ghost normal-case text-xl">FarmFromYou</a>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal p-0">
      <li><a>Sign Up</a></li>
      <li><a>Sign In</a></li>
    </ul>
  </div>
</div>









<div className="navbar bg-info">
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl" to="/">
          FarmFromYou
        </Link>
        <div className="flex-none">
          <ul className="menu menu-horizontal p-0">
            {user ? (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/auth/signout"
                    className="nav-link"
                  >
                    Sign out
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/user/edit"
                    className="nav-link"
                  >
                    Edit
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/users"
                    className="nav-link"
                  >
                    Users
                  </NavLink>
                </li>
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src="https://shapka-youtube.ru/wp-content/uploads/2021/02/avatarka-dlya-skaypa-dlya-parney.jpg" alt="bla" />
                  </div>
                </div>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/auth/signup"
                    className="nav-link"
                  >
                    Sign Up
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/auth/signin"
                    className="nav-link"
                  >
                    Sign In
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
