
<div className="d-flex justify-content-center">
      <form
        onSubmit={submitHandler}
        className="d-flex flex-column align-items-center bg-light text-dark p-3 border rounded-3"
      >
        <legend className="text-center mb-4">User Edit</legend>
        <div className="mb-3">
          <input
            onChange={changeHandler}
            className="form-control"
            value={userEdit.email}
            type="email"
            name="email"
            placeholder="Email"
          />
        </div>
        <div className="mb-3">
          <input
            onChange={changeHandler}
            className="form-control"
            value={userEdit.userName}
            type="text"
            name="userName"
            placeholder="Name"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Edit
        </button>
      </form>
    </div>
