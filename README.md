# FarFromYou
   <form>
        <label>
          Выберите комнату:
          <select value={roomall.id} onChange={roomHandler}>
            {roomall && roomall.map((el) => (<option value={el.id}>{el.roomName}</option>))}
          </select>
        </label>
      </form>
      <button type="submit" onClick={guestHandler} className="btn btn-outline-info">Присоединиться к комнате</button>
    </>
