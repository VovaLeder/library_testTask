namespace Library
{ 
    public class ConnectionString
    {
        public static string Host = "localhost";
        public static string Port = "5432";
        public static string Database = "library";
        public static string Username = "postgres";
        public static string Password = "1234";

        public static string ConnectionStr = $"Host={Host};Port={Port};Database={Database};Username={Username};Password={Password}";
    }
}
