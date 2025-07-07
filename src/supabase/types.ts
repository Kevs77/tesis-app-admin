export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      category: {
        Row: {
          created_at: string
          id: number
          imageUrl: string
          name: string
          products: number[] | null
          slug: string
        }
        Insert: {
          created_at?: string
          id?: number
          imageUrl: string
          name: string
          products?: number[] | null
          slug: string
        }
        Update: {
          created_at?: string
          id?: number
          imageUrl?: string
          name?: string
          products?: number[] | null
          slug?: string
        }
        Relationships: []
      }
      contacto_user: {
        Row: {
          apellido: string
          created_at: string
          id: number
          nombre: string
          telefono: string
          user: string | null
          vinculo: string
        }
        Insert: {
          apellido: string
          created_at?: string
          id?: number
          nombre: string
          telefono: string
          user?: string | null
          vinculo: string
        }
        Update: {
          apellido?: string
          created_at?: string
          id?: number
          nombre?: string
          telefono?: string
          user?: string | null
          vinculo?: string
        }
        Relationships: [
          {
            foreignKeyName: "contacto_user_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      detalle_servicio: {
        Row: {
          codigo_cliente: string | null
          created_at: string
          cuenta: string | null
          entidad_cobranzas: string | null
          formulario: number | null
          id: number
          suscripcion_nueva: boolean | null
        }
        Insert: {
          codigo_cliente?: string | null
          created_at?: string
          cuenta?: string | null
          entidad_cobranzas?: string | null
          formulario?: number | null
          id?: number
          suscripcion_nueva?: boolean | null
        }
        Update: {
          codigo_cliente?: string | null
          created_at?: string
          cuenta?: string | null
          entidad_cobranzas?: string | null
          formulario?: number | null
          id?: number
          suscripcion_nueva?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "detalle_servicio_formulario_fkey"
            columns: ["formulario"]
            isOneToOne: false
            referencedRelation: "formulario_servicio"
            referencedColumns: ["id"]
          },
        ]
      }
      drivers: {
        Row: {
          car_image_url: string | null
          car_seats: number
          created_at: string | null
          first_name: string
          id: string
          last_name: string
          profile_image_url: string | null
          rating: number | null
        }
        Insert: {
          car_image_url?: string | null
          car_seats: number
          created_at?: string | null
          first_name: string
          id?: string
          last_name: string
          profile_image_url?: string | null
          rating?: number | null
        }
        Update: {
          car_image_url?: string | null
          car_seats?: number
          created_at?: string | null
          first_name?: string
          id?: string
          last_name?: string
          profile_image_url?: string | null
          rating?: number | null
        }
        Relationships: []
      }
      factura: {
        Row: {
          autorizacion: boolean | null
          correo: string | null
          created_at: string
          departamento: string | null
          direccion: string | null
          formulario: number | null
          id: number
          nit: string | null
          nombre: string | null
          provincia: string | null
          telefono: string | null
        }
        Insert: {
          autorizacion?: boolean | null
          correo?: string | null
          created_at?: string
          departamento?: string | null
          direccion?: string | null
          formulario?: number | null
          id?: number
          nit?: string | null
          nombre?: string | null
          provincia?: string | null
          telefono?: string | null
        }
        Update: {
          autorizacion?: boolean | null
          correo?: string | null
          created_at?: string
          departamento?: string | null
          direccion?: string | null
          formulario?: number | null
          id?: number
          nit?: string | null
          nombre?: string | null
          provincia?: string | null
          telefono?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "factura_formulario_fkey"
            columns: ["formulario"]
            isOneToOne: false
            referencedRelation: "formulario_servicio"
            referencedColumns: ["id"]
          },
        ]
      }
      formulario_servicio: {
        Row: {
          created_at: string
          id: number
          nit: string | null
          nombre: string
          razon_social: string | null
          tipo_usuario: string
          user: string
        }
        Insert: {
          created_at?: string
          id?: number
          nit?: string | null
          nombre: string
          razon_social?: string | null
          tipo_usuario: string
          user: string
        }
        Update: {
          created_at?: string
          id?: number
          nit?: string | null
          nombre?: string
          razon_social?: string | null
          tipo_usuario?: string
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "formulario_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      order: {
        Row: {
          created_at: string
          description: string | null
          id: number
          slug: string
          status: string
          totalPrice: number
          user: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          slug: string
          status: string
          totalPrice: number
          user: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          slug?: string
          status?: string
          totalPrice?: number
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      order_item: {
        Row: {
          created_at: string
          id: number
          order: number
          product: number
          quantity: number
        }
        Insert: {
          created_at?: string
          id?: number
          order: number
          product: number
          quantity: number
        }
        Update: {
          created_at?: string
          id?: number
          order?: number
          product?: number
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_item_order_fkey"
            columns: ["order"]
            isOneToOne: false
            referencedRelation: "order"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_item_product_fkey"
            columns: ["product"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
        ]
      }
      product: {
        Row: {
          category: number
          created_at: string
          heroImage: string
          id: number
          maxQuantity: number
          price: number
          slug: string
          title: string
        }
        Insert: {
          category: number
          created_at?: string
          heroImage: string
          id?: number
          maxQuantity: number
          price: number
          slug: string
          title: string
        }
        Update: {
          category?: number
          created_at?: string
          heroImage?: string
          id?: number
          maxQuantity?: number
          price?: number
          slug?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
        ]
      }
      rides: {
        Row: {
          created_at: string | null
          destination_address: string
          destination_latitude: number
          destination_longitude: number
          driver_id: string | null
          fare_price: number
          origin_address: string
          origin_latitude: number
          origin_longitude: number
          payment_status: string
          ride_id: string
          ride_time: number
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          destination_address: string
          destination_latitude: number
          destination_longitude: number
          driver_id?: string | null
          fare_price: number
          origin_address: string
          origin_latitude: number
          origin_longitude: number
          payment_status: string
          ride_id?: string
          ride_time: number
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          destination_address?: string
          destination_latitude?: number
          destination_longitude?: number
          driver_id?: string | null
          fare_price?: number
          origin_address?: string
          origin_latitude?: number
          origin_longitude?: number
          payment_status?: string
          ride_id?: string
          ride_time?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rides_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      servicio_internet: {
        Row: {
          created_at: string
          formulario: number | null
          id: number
          instancia: string | null
          nombre: string
          plan: string | null
          red_ip: string | null
          tarifa: number | null
          velocidad: string | null
        }
        Insert: {
          created_at?: string
          formulario?: number | null
          id?: number
          instancia?: string | null
          nombre: string
          plan?: string | null
          red_ip?: string | null
          tarifa?: number | null
          velocidad?: string | null
        }
        Update: {
          created_at?: string
          formulario?: number | null
          id?: number
          instancia?: string | null
          nombre?: string
          plan?: string | null
          red_ip?: string | null
          tarifa?: number | null
          velocidad?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "servicio_internet_formulario_fkey"
            columns: ["formulario"]
            isOneToOne: false
            referencedRelation: "formulario_servicio"
            referencedColumns: ["id"]
          },
        ]
      }
      servicio_internet_movil: {
        Row: {
          created_at: string
          formulario: number | null
          id: number
          megas: boolean | null
          minutos: boolean | null
          nombre: string
          nro_favorito: string | null
          nro_telefono: string
          plan: string | null
          servicio_adicional: string | null
          tarifa: number | null
          telegram: boolean | null
          velocidad: string | null
          whatsapp: boolean | null
        }
        Insert: {
          created_at?: string
          formulario?: number | null
          id?: number
          megas?: boolean | null
          minutos?: boolean | null
          nombre: string
          nro_favorito?: string | null
          nro_telefono: string
          plan?: string | null
          servicio_adicional?: string | null
          tarifa?: number | null
          telegram?: boolean | null
          velocidad?: string | null
          whatsapp?: boolean | null
        }
        Update: {
          created_at?: string
          formulario?: number | null
          id?: number
          megas?: boolean | null
          minutos?: boolean | null
          nombre?: string
          nro_favorito?: string | null
          nro_telefono?: string
          plan?: string | null
          servicio_adicional?: string | null
          tarifa?: number | null
          telegram?: boolean | null
          velocidad?: string | null
          whatsapp?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "servicio_internet_movil_formulario_fkey"
            columns: ["formulario"]
            isOneToOne: false
            referencedRelation: "formulario_servicio"
            referencedColumns: ["id"]
          },
        ]
      }
      servicio_IPTV: {
        Row: {
          created_at: string
          formulario: number | null
          id: number
          instancia: string | null
          nombre: string
          nro_androidtv: number | null
          nro_tvs: number | null
          plan: string | null
          servicio_adicional: string | null
          tarifa: number | null
        }
        Insert: {
          created_at?: string
          formulario?: number | null
          id?: number
          instancia?: string | null
          nombre: string
          nro_androidtv?: number | null
          nro_tvs?: number | null
          plan?: string | null
          servicio_adicional?: string | null
          tarifa?: number | null
        }
        Update: {
          created_at?: string
          formulario?: number | null
          id?: number
          instancia?: string | null
          nombre?: string
          nro_androidtv?: number | null
          nro_tvs?: number | null
          plan?: string | null
          servicio_adicional?: string | null
          tarifa?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "servicio_IPTV_formulario_fkey"
            columns: ["formulario"]
            isOneToOne: false
            referencedRelation: "formulario_servicio"
            referencedColumns: ["id"]
          },
        ]
      }
      servicio_telefonia: {
        Row: {
          created_at: string
          formulario: number | null
          id: number
          instancia: string | null
          nombre: string | null
          numero: string | null
          plan: string | null
          tarifa: number | null
        }
        Insert: {
          created_at?: string
          formulario?: number | null
          id?: number
          instancia?: string | null
          nombre?: string | null
          numero?: string | null
          plan?: string | null
          tarifa?: number | null
        }
        Update: {
          created_at?: string
          formulario?: number | null
          id?: number
          instancia?: string | null
          nombre?: string | null
          numero?: string | null
          plan?: string | null
          tarifa?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "servicio_telefonia_formulario_fkey"
            columns: ["formulario"]
            isOneToOne: false
            referencedRelation: "formulario_servicio"
            referencedColumns: ["id"]
          },
        ]
      }
      servicio_VOZIP: {
        Row: {
          consumo: string | null
          correo: string | null
          created_at: string
          formulario: number | null
          id: number
          instancia: string | null
          limite: string | null
          monto: number | null
          nombre: string | null
          numero: string | null
          plan: string | null
          tarifa: number | null
        }
        Insert: {
          consumo?: string | null
          correo?: string | null
          created_at?: string
          formulario?: number | null
          id?: number
          instancia?: string | null
          limite?: string | null
          monto?: number | null
          nombre?: string | null
          numero?: string | null
          plan?: string | null
          tarifa?: number | null
        }
        Update: {
          consumo?: string | null
          correo?: string | null
          created_at?: string
          formulario?: number | null
          id?: number
          instancia?: string | null
          limite?: string | null
          monto?: number | null
          nombre?: string | null
          numero?: string | null
          plan?: string | null
          tarifa?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "servicio_VOZIP_formulario_fkey"
            columns: ["formulario"]
            isOneToOne: false
            referencedRelation: "formulario_servicio"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          address: string | null
          ap_materno: string
          ap_paterno: string
          avatar_url: string
          ci: string
          created_at: string | null
          email: string
          expedido_en: string
          expo_notification_token: string | null
          fecha_nacimiento: string
          id: string
          name: string
          phone: string | null
          stripe_customer_id: string | null
          type: string
        }
        Insert: {
          address?: string | null
          ap_materno: string
          ap_paterno: string
          avatar_url: string
          ci: string
          created_at?: string | null
          email: string
          expedido_en: string
          expo_notification_token?: string | null
          fecha_nacimiento: string
          id: string
          name: string
          phone?: string | null
          stripe_customer_id?: string | null
          type?: string
        }
        Update: {
          address?: string | null
          ap_materno?: string
          ap_paterno?: string
          avatar_url?: string
          ci?: string
          created_at?: string | null
          email?: string
          expedido_en?: string
          expo_notification_token?: string | null
          fecha_nacimiento?: string
          id?: string
          name?: string
          phone?: string | null
          stripe_customer_id?: string | null
          type?: string
        }
        Relationships: []
      }
      users_test: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          nombre: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          nombre?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          nombre?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      decrement_product_quantity: {
        Args: { product_id: number; quantity: number }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
