from rest_framework.pagination import CursorPagination, LimitOffsetPagination


class VenueCursorPagination(CursorPagination):
    page_size = 4
    ordering = "-created_at"


class VenueLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 5
    max_limit = 20
