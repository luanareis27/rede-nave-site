import React, { useEffect, useState } from "react";
import "/src/styles/admin.css";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../config/firebase";

type User = {
  id: string;
  nomeCompleto: string;
  email: string;
  telefone?: string;
  dataNascimento?: string;
  createdAt?: any;
  role: string;
  status: string;
  tracksCount?: number;
  progress?: number;
  certificate?: boolean;
};

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const snapshot = await getDocs(collection(db, "users"));

    const data: User[] = snapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...(docItem.data() as Omit<User, "id">),
    }));

    setUsers(data);
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  const handleDeleteUser = async (userId: string) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir esta usuária?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "users", userId));
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      alert("Usuária excluída com sucesso");
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir usuária");
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchSearch =
      user.nomeCompleto?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase());

    const matchStatus = statusFilter
      ? user.status === statusFilter
      : true;

    return matchSearch && matchStatus;
  });

  return (
    <section className="admin-users">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1 ">Usuárias</h2>
          <p className="text-muted mb-0">
            Gerencie participantes e acompanhe o progresso nas trilhas
          </p>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body d-flex gap-3 flex-wrap">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nome ou email"
            style={{ maxWidth: "280px" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="form-select"
            style={{ maxWidth: "220px" }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Status</option>
            <option value="Ativa">Ativa</option>
            <option value="Concluinte">Concluinte</option>
            <option value="Inativa">Inativa</option>
          </select>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Tipo</th>
                  <th>Trilhas</th>
                  <th>Progresso</th>
                  <th>Certificado</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.nomeCompleto}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.tracksCount ?? "-"}</td>
                    <td>
                      {user.progress !== undefined
                        ? `${user.progress}%`
                        : "-"}
                    </td>
                    <td>
                      {user.certificate ? (
                        <span className="badge bg-success">Emitido</span>
                      ) : (
                        <span className="badge bg-secondary">Pendente</span>
                      )}
                    </td>
                    <td>
                      <span className={`badge bg-primary`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleViewUser(user)}
                      >
                        Ver
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && selectedUser && (
        <div
          className="modal fade show d-block"
          style={{
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Dados da Usuária</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                />
              </div>

              <div className="modal-body">
                <p><strong>Nome:</strong> {selectedUser.nomeCompleto}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Telefone:</strong> {selectedUser.telefone || "-"}</p>
                <p>
                  <strong>Data de Nascimento:</strong>{" "}
                  {selectedUser.dataNascimento || "-"}
                </p>
                <p><strong>Status:</strong> {selectedUser.status}</p>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>

      )}
    </section>
  );
};

export default AdminUsers;
